import React from "react";
import {useForm} from "react-hook-form";

type FormData = {
  name: string;
};

function Form4(): React.JSX.Element {
  const {register, handleSubmit, formState, reset} = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟 API 请求
    reset();
    // 3 秒后清除 isSubmitted，但不清空输入框
    setTimeout(() => {
      reset(undefined, {keepValues: true, keepErrors: true, keepDirty: true});
    }, 3000);
  };
  return (
    <div>
      <h2>Form4</h2>
      
      <p>使用 React Hook Form 的 `formState`</p>
      <p>使用formstate.errors来显示错误</p>
      <p>使用formstate.isSubmitted来显示提交成功</p>
      <p>使用reset()来重置表单</p>
      <p>
        使用{" "}
        <code>
          reset(undefined, &#123;keepValues: true, keepErrors: true, keepDirty:
          true&#125;)
        </code>{" "}
        来重置表单
      </p>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          className="form-control"
          {...register("name", {required: "Name is required"})}
        />
        {formState.errors.name && (
          <p className="text-danger">{formState.errors.name.message}</p>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formState.isSubmitting}
        >
          Submit
        </button>
        {formState.isSubmitSuccessful && (
          <div className="alert alert-success" role="alert">
            提交成功
          </div>
        )}
      </form>
    </div>
  );
}

export default Form4;
