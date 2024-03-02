import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';
// export const RegisterFormData = {
//     firstname : 'String',
//     lastname : 'String',
//     email: 'String',
//     password: 'String',
//     confirmpassword : 'String'
// };

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () =>{
        console.log("Đăng kí thành công!")
    },
    onError: (error)=>{
        console.log(error.message);
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className=" text-3xl font-bold">Tạo tài khoản</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Họ
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstname", { required: "Vui lòng không bỏ trống" })}
          ></input>
          {errors.firstname && (
            <span className="text-red-500">{errors.firstname.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Tên
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastname", { required: "Vui lòng không bỏ trống" })}
          ></input>
            {errors.lastname && (
            <span className="text-red-500">{errors.lastname.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", {
            required: "Vui lòng không bỏ trống",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Địa chỉ email không hợp lệ",
            },
          })}
        ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Mật khẩu
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Vui lòng không bỏ trống",
            minLength: {
              value: 6,
              message: "Mật khẩu phải chứ ít nhất 6 ký tự",
            },
          })}
        ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Nhập lại mật khẩu
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmpassword", {
            validate: (val) => {
              if (!val) {
                return "Vui lòng không bỏ trống";
              } else if (watch("password") !== val) {
                return "Mật khẩu không khớp";
              }
            },
          })}
        ></input>
          {errors.confirmpassword && (
            <span className="text-red-500">{errors.confirmpassword.message}</span>
          )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 font-bold hover:bg-blue-400 text-xl"
        >
          Tạo tài khoản
        </button>
      </span>
    </form>
  );
};

export default Register;
