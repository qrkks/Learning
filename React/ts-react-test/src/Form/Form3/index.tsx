import {useForm} from "react-hook-form";

type FormData = {
  name: string;
};

function MyForm(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      touchedFields,
      dirtyFields,
    },
  } = useForm<FormData>({mode: "onChange"}); // `onChange` 模式下实时验证

  const onSubmit = async (data: FormData) => {
    console.log("Submitting...", data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟 API 请求
    console.log("Submitted!");
  };

  return (
    <div>
      <h2>React Hook Form `formState` 示例</h2>
      <p>使用 React Hook Form 的 `formState`</p>
      <p>`onChange` 模式下实时验证</p>
      <p>
        🎯 formState 触发重新渲染的原理 formState 内部使用 useState
        管理状态，所以它的变化会导致组件重新渲染。 当表单状态改变（如 errors
        发生变化、用户输入数据改变），React Hook Form 会自动 触发 formState
        的更新，并重新渲染组件。 但 watch()
        只是获取数据，并不会触发重新渲染，区别在这里： formState = 触发重新渲染
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {required: "Name is required"})}
          placeholder="Name"
          className="form-control"
        />
        {errors.name && <p style={{color: "red"}}>{errors.name.message}</p>}

        {/* ✅ 当 `isSubmitting` 为 true 时，禁用按钮并显示 Loading */}
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "提交中..." : "提交"}
        </button>

        {/* ✅ 也可以用转圈动画 */}
        {isSubmitting && <div className="spinner"></div>}
      </form>

      {/* ✅ 这些状态信息可以在 UI 上展示 */}
      <div>
        <p>是否修改过 (`isDirty`): {isDirty ? "✅ 是" : "❌ 否"}</p>
        <p>是否验证通过 (`isValid`): {isValid ? "✅ 是" : "❌ 否"}</p>
        <p>
          是否正在提交 (`isSubmitting`):{" "}
          {isSubmitting ? "⏳ 提交中..." : "✅ 未提交"}
        </p>
        <p>是否已提交 (`isSubmitted`): {isSubmitted ? "✅ 是" : "❌ 否"}</p>
        <p>被触碰的字段 (`touchedFields`): {JSON.stringify(touchedFields)}</p>
        <p>被修改的字段 (`dirtyFields`): {JSON.stringify(dirtyFields)}</p>
      </div>
    </div>
  );
}

export default MyForm;
