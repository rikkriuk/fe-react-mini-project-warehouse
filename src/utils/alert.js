import Swal from "sweetalert2";

const successAlert = (text = "Data telah disimpan") => {
  Swal.fire({
    title: "Berhasil!",
    text,
    icon: "success",
    confirmButtonText: "OK",
  });
};

const errorAlert = (text = "Terjadi kesalahan") => {
  Swal.fire({
    title: "Error!",
    text,
    icon: "error",
    confirmButtonText: "Coba Lagi",
  });
};

export { successAlert, errorAlert };
