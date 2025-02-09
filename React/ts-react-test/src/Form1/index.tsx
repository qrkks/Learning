import React, {useState} from "react";

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
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    // console.log(e.target)
  };
  // useEffect(() => {
  //   console.log("Updated values:", values); // ✅ 这里会打印最新的 `values`
  // }, [values]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(values);
    if (validateFormData()) {
      console.log("Valid form data", values);
    } else {
      console.log("Invalid form data");
    }
  };

  const validateFormData = () => {
    // const errors = {
    //   customerName: "",
    //   mobile: "",
    // };
    if (!values.customerName) {
      errors.customerName = "Customer Name is required";
    }
    if (!values.mobile) {
      errors.mobile = "Mobile is required";
    }
    setErrors(errors); // 更新 errors;
    return Object.values(errors).every((err) => err === "");
  };

  return (
    <div>
      <h2>Form1</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* <label className="form-label">Customer Name</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="Customer Name"
            value={values.customerName}
            onChange={handleInputChange}
            name="customerName"
          />
        </div>
        <div className="mb-3">
          {/* <label className="form-label">Customer Name</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            value={values.mobile}
            name="mobile"
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Form1;
