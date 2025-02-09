import React, { useState } from "react";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

function Form1(): React.JSX.Element {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));

    // 用户输入时清除错误
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateFormData = () => {
    const newErrors: FoodDeliveryFormType = {
      customerName: "",
      mobile: "",
    };

    if (!values.customerName) {
      newErrors.customerName = "Customer Name is required";
    }
    if (!values.mobile) {
      newErrors.mobile = "Mobile is required";
    }

    setErrors(newErrors); // ✅ 正确更新 state
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFormData()) {
      console.log("Valid form data", values);
    } else {
      console.log("Invalid form data");
    }
  };

  return (
    <div>
      <h2>Form1</h2>
      <p>使用react常规方法建立表单</p>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Customer Name"
            value={values.customerName}
            onChange={handleInputChange}
            name="customerName"
          />
          {errors.customerName && <p style={{ color: "red" }}>{errors.customerName}</p>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            value={values.mobile}
            name="mobile"
            onChange={handleInputChange}
          />
          {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Form1;
