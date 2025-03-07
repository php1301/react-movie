import { qLNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP,
  GET_DANH_SACH_NGUOI_DUNG,
  LAY_THONG_TIN_TAI_KHOAN,
} from "../types/QuanLyNguoiDungType";
import { history } from "../../App";
import Swal from "sweetalert2";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await qLNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP,
          thongTinDangNhap: result.data.content,
        });
        history.goBack();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const layThongTinTaiKhoanAction = () => {
  return async (dispatch) => {
    try {
      const result = await qLNguoiDungService.layThongTinTaiKhoan();
      dispatch(displayLoadingAction);
      await dispatch({
        type: LAY_THONG_TIN_TAI_KHOAN,
        userInfo: result.data.content,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await qLNguoiDungService.dangKy(thongTinDangKy);
      if (result.data.statusCode === 200) {
        alert("Đăng ký thành công!");
        history.push("/login");
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const capNhatThongTinNguoiDungAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await qLNguoiDungService.capNhatThongTinNguoiDung(data);
      await dispatch(hideLoadingAction);
      await Swal.fire({
        icon: "success",
        title: "Oops...",
        text: "Bạn đã cập nhật thành công",
        footer: "Nhấn ok để tiếp tục",
      });
    } catch (error) {
      console.log({ error });
      dispatch(hideLoadingAction);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response?.data.content}`,
      });
    }
  };
};

export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await qLNguoiDungService.layDanhSachNguoiDung(tuKhoa);
      console.log({ result });
      dispatch({
        type: GET_DANH_SACH_NGUOI_DUNG,
        payload: result.data.content,
      });
      await dispatch(hideLoadingAction);
    } catch (error) {
      console.log({ error });
      await dispatch(hideLoadingAction);
    }
  };
};

export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await qLNguoiDungService.xoaNguoiDung(taiKhoan);
      await Swal.fire({
        icon: "success",
        title: "Oops...",
        text: "Xoá người dùng thành công!",
        footer: "Nhấn ok để tiếp tục",
      });
      await dispatch(layDanhSachNguoiDungAction());
    } catch (error) {
      console.log({ error });
    }
  };
};

export const themNguoiDungAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await qLNguoiDungService.themNguoiDung(thongTinNguoiDung);
      console.log({ result });
      await dispatch(hideLoadingAction);
      await Swal.fire({
        icon: "success",
        title: "Oops...",
        text: "Bạn đã thêm người dùng thành công",
        footer: "Nhấn ok để tiếp tục",
      });

      history.push("/admin/users");
      dispatch(layDanhSachNguoiDungAction());
    } catch (error) {
      console.log({ error });
      await dispatch(hideLoadingAction);
      await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response?.data.content}`,
        })
    }
  };
};
