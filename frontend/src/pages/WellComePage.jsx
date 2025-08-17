import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const WellComePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.role) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleWelcomeClick = () => {
    navigate("/Home");
  };

  return (
    <div className="h-[calc(99vh)] fixed top-1   flex bg-slate-400 p-2 mx-1 rounded-md">
      <div className="bg-slate-200 p-6 py-2 rounded-md w-full overflow-y-auto shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-center mb-1 text-slate-800">
            Welcome to Goyal Printing & Covering Industries
          </h2>

          <div className="flex flex-col items-center justify-center mb-1 space-y-1">
            {user?.role ? (
              <>
                <h1 className="text-3xl font-bold text-center text-slate-800">
                  Hello {user?.name}
                </h1>
                <button
                  onClick={handleLogout} // or dispatch a logout action
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
              >
                Login
              </button>
            )}
          </div>

          {user?.role === "GENERAL" && (
            <p className="text-lg text-center text-red-500 mb-1">
              <strong>{user?.name} </strong> you are a{" "}
              <strong>{user?.role}</strong>. Please contact the admin for
              access.
            </p>
          )}

          <p className="text-lg text-slate-700 mb-4">
            At <strong>Goyal Printing & Covering Industries</strong>, we
            specialize in high-quality printing and finishing services that
            bring your ideas to life. Whether it's offset printing, digital
            prints, custom covers, or binding, our expert team ensures precise
            craftsmanship at every stage.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            What Happens in the Printing Press?
          </h2>

          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>
              <strong>Design & Proofing:</strong> Our designers collaborate with
              clients to finalize layouts and visuals before printing begins.
            </li>
            <li>
              <strong>Plate Making & Setup:</strong> For offset jobs, plates are
              created and aligned on machines for multi-color precision.
            </li>
            <li>
              <strong>Printing:</strong> Using advanced offset and digital
              machines, we print on various media including paper, card, and
              custom materials.
            </li>
            <li>
              <strong>Binding & Covering:</strong> Jobs requiring binding,
              lamination, or special covers are handled with care in our
              finishing section.
            </li>
            <li>
              <strong>Quality Check:</strong> Every batch undergoes inspection
              to ensure color accuracy, alignment, and finish quality.
            </li>
            <li>
              <strong>Packing & Delivery:</strong> Final products are packed
              securely and dispatched as per the delivery schedule.
            </li>
          </ul>

          <p className="mt-6 text-slate-700">
            Our goal is to deliver{" "}
            <strong>precision, speed, and satisfaction</strong>—every single
            time. Thank you for choosing Goyal Printing & Covering Industries.
          </p>
        </div>

        {/* Welcome Button + Tooltip + Note */}
        <div className="mt-8 flex flex-col items-center space-y-2 relative group">
          {(user?.role === "ADMIN" || user?.role === "EMPLOYEE") && (
            <button
              onClick={handleWelcomeClick}
              className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 px-10  rounded-lg transition-all duration-200"
            >
              🙏 Welcome 🙏
            </button>
          )}

          {/* Tooltip (only visible on hover) */}
          <div className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Only Admin and Employee can enter
          </div>

          {/* Static note under button */}
          <p className="text-sm text-slate-600 italic">
            If you are unable to enter, please contact the admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WellComePage;
