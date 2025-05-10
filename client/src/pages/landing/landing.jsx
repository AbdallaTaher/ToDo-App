import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router";
import TodoHome from "../../assets/TodoHome.png";
import GetUser from "../../Utils/GetUser";
function Landing() {
  const user = GetUser();
  return (
    <>
      <main className="max-h-screen">
        <Navbar />
        <section className="py-12 md:py-16 px-6 md:px-10 ">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Schedule Your
                <br />
                Daily Tasks With
                <br />
                <span className="text-blue-500">TODO!</span>
              </h1>
              {!user && (
                <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                  <Link
                    to="/register"
                    className="px-8 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-3 bg-blue-100 text-blue-500 font-medium rounded hover:bg-blue-100 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={TodoHome}
                alt="DoDo task management illustration"
                className="max-w-full h-auto rounded-lg shadow-xl bg-transparent"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Landing;
