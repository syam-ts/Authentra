import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice.js";

const AdminEditUser = () => {
  interface FormData {
    username?: string;
    email?: string;
    password?: string;
    profilePicture?: string;
  }

  interface Users {
    _id: any;
    profilePicture: string;
    username: string;
    email: string;
  }

  const { user, loading, error } = useSelector((state: any) => state.user);

  const { userId } = useParams();
  const [users, setUsers] = useState({});
  const fileRef: any = useRef(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/api/user/admin/admin-edit/${userId}`
        );
        const userData = res.data;
        console.log("The data : ", userData);
        setUsers(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleFileUpload = async (image: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error: any) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    console.log("form: ", formData);
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${users._id}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.log("error");
    }
  };

  return (
    <div className="h-full mx-96">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto p-20 lg:w-5/12 bg-cover rounded-l-lg">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="/image/*"
                onChange={(e: any) => setImage(e.target.files[0])}
              />
              <img
                src={formData.profilePicture || users.profilePicture}
                alt="profile"
                className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                onClick={() => fileRef.current.click()}
              />

              <p className="text-sm self-center">
                {imageError ? (
                  <span className="text-red-700">
                    {" "}
                    Error Uploading image ( file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className="text-slate-700">
                    {`Uploading: ${imagePercent} %`}
                  </span>
                ) : imagePercent === 100 ? (
                  <span className="text-green-700">
                    Image uploaded successfully
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>

            <div className="w-full lg:w-7/12 bg-white :bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 :text-white">
                Edit User
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white :bg-gray-800 rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-4 grid gap-6 md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <input
                      defaultValue={users.username}
                      type="text"
                      id="username"
                      placeholder="username"
                      className="bg-slate-100 rounded-lg p-3"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <input
                      defaultValue={users.email}
                      type="text"
                      id="email"
                      placeholder="email"
                      className="bg-slate-100 rounded-lg p-3"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? "Loading..." : "Update"}
                  </button>
                </div>
                <hr className="mb-6 border-t" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUser;
