export default function ErrorModal() {
  return (
    <div className="inset-0 fixed bg-black/50">
      <div className="">
        <div className=" absolute top-[50%] left-[50%]">
          <img src="/spinner.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
