import { makeAutoObservable } from "mobx";
import CryptoJS from "crypto-js";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated = false;
  username = "";
  secretKey = "my-secret-key"; // 加密密钥

  // 加密存储方法
  encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  // 解密读取方法
  decryptData(encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("解密失败:", error);
      return null;
    }
  }

  login(username, access, refresh) {
    this.username = username;
    this.isAuthenticated = true;
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", this.encryptData(username));
    localStorage.setItem("token", this.encryptData(access)); // 对 token 加密
    localStorage.setItem("refresh", this.encryptData(refresh)); // 对 refresh token 加密
  }

  loadAuthState() {
    // 从 localStorage 加载认证状态
    const encryptedUsername = localStorage.getItem("username");
    if (encryptedUsername) {
      this.username = this.decryptData(encryptedUsername);
    }

    const encryptedToken = localStorage.getItem("token");
    if (encryptedToken) {
      this.token = this.decryptData(encryptedToken); // 解密 token
    }

    const encryptedRefresh = localStorage.getItem("refresh");
    if (encryptedRefresh) {
      this.refresh = this.decryptData(encryptedRefresh); // 解密 refresh token
    }

    this.isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  }

  setIsAuthenticated(isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }
}

export const authStore = new AuthStore();
