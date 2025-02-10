import React from "react";
import {useForm} from "react-hook-form";

type FoodDeliveryFormType = {
  orderNo: string;
  customerName: string;
  mobile: string;
  email: string;
};
console.log("Form4.tsx 这个文件被执行了");
function Form2(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: {errors}, // ✅ 解构 `errors`
  } = useForm<FoodDeliveryFormType>({
    defaultValues: {
      orderNo: new Date().getTime().toString(),
      // orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
    },
  });

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("Valid form data", formData);
  };

  return (
    <div>
      <h2>使用 react-hook-form 方法建立表单</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mt-3 row">
          <div className="col">
            {" "}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="#Order No."
                {...register("orderNo", {
                  required: "Order No. is required",
                })}
                disabled
              />
              {/* ✅ 显示错误消息 */}
              {errors.orderNo && (
                <div className="alert alert-danger" style={{color: "red"}}>
                  {errors.orderNo.message}
                </div>
              )}
            </div>
          </div>
          <div className="col">
            {" "}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Mobile"
                {...register("mobile", {
                  required: "Mobile is required",
                  minLength: {
                    value: 10,
                    message: "Mobile must be at least 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Mobile must be at most 10 digits",
                  },
                })}
              />
              {/* ✅ 显示错误消息 */}
              {errors.mobile && (
                <div className="alert alert-danger" style={{color: "red"}}>
                  {errors.mobile.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Customer Name"
                {...register("customerName", {
                  required: "Customer Name is required",
                })}
              />
              {/* ✅ 显示错误消息 */}
              {errors.customerName && (
                <div className="alert alert-danger" style={{color: "red"}}>
                  {errors.customerName.message}
                </div>
              )}
            </div>
          </div>
          <div className="col">
            {" "}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                {...register("email", {required: "Email is required"})}
              />
              {/* ✅ 显示错误消息 */}
              {errors.email && (
                <div className="alert alert-danger" style={{color: "red"}}>
                  {errors.email.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Form2;
