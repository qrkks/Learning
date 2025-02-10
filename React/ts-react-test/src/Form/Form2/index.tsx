import React from "react";
import {useForm} from "react-hook-form";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};
console.log('这个文件被执行了')
function Form2(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: {errors}, // ✅ 解构 `errors`
  } = useForm<FoodDeliveryFormType>({mode:'onBlur'});

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("Valid form data", formData);
  };

  return (
    <div>
      <h2>使用 react-hook-form 方法建立表单</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <p style={{color: "red"}}>{errors.customerName.message}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            {...register("mobile", {required: "Mobile is required"})}
          />
          {/* ✅ 显示错误消息 */}
          {errors.mobile && (
            <p style={{color: "red"}}>{errors.mobile.message}</p>
          )}
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Form2;
