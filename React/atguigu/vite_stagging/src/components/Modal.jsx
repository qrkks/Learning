export const Modal = (props) => {
  console.log(props.children);
  return (
    <>
      <div
        className="fixed inset-0 z-10 bg-black bg-opacity-50 "
        onClick={() => props.handleModal(false)}
      />
      <dialog
        open
        className="z-10 w-1/2 p-5 text-white rounded-lg mt-96 "
      >
        {props.children}
      </dialog>
    </>
  );
};
