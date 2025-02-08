import React from "react";

const Register = () => {
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <p>Welcome to BlinkeyIt....</p>
        <form action="" className="grid gap-2 mt-6">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              autoFocus
              placeholder="Enter Name"
              className="'bg-blue-50 p-2"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
