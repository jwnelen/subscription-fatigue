const DisplayTotal = ({ total }) => {
  return (
    <div className="fixed w-full bottom-8 text-center ">
      <p className="text-2xl p-2 text-white bg-blue-900 w-max mx-auto rounded ">
        Total: &euro;{total.toFixed(2)} p/m
      </p>
    </div>
  );
};

export default DisplayTotal;
