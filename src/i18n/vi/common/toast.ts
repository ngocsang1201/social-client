const toast = {
  auth: {
    loginSuccess: 'Đăng ký thành công.',
    activeSuccess: 'Tài khoản của bạn đã được kích hoạt.',
    activeAccount: 'Vui lòng kiểm tra email của bạn để kích hoạt tài khoản!',
  },
  createEditForm: {
    createError: 'Đăng bài thất bại.',
    updateError: 'Cập nhật bài viết thất bại.',
  },
  postCard: {
    saveSuccess: 'Đã lưu.',
    deleteSuccess: 'Xóa bài viết thành công.',
  },
  postDetail: {
    saveSuccess: 'Đã lưu.',
    deleteSuccess: 'Xóa bài viết thành công.',
  },
  postItem: {
    deleteSuccess: 'Xóa bài viết thành công.',
    unsaveSuccess: 'Bỏ lưu bài viết thành công.',
  },
  settingSaga: {
    updateProfileSuccess: 'Cập nhật thông tin thành công.',
  },
  changePasswordPage: {},
  changePasswordForm: {
    success: 'Đổi mật khẩu thành công',
  },

  errors: {
    // authCtrl
    emailNotRegister: 'Email chưa được đăng ký.',
    emailExist: 'Email đã tồn tại.',
    userNotFound: 'Không tìm thấy người dùng.',
    accountAlreadyActive: 'Tài khoản đã được kích hoạt.',
    usernameExist: 'Tên người dùng đã tồn tại.',
    passwordNotCorrect: 'Mật khẩu không đúng.',
    activeAccount: 'Vui lòng kích hoạt tài khoản.',

    // postCtrl
    postNotFound: 'Không tìm thấy bài viết.',
    notAllowedEditPost: 'Bạn không được phép chỉnh sửa bài viết này.',
    notAllowedDeletePost: 'Bạn không được phép xóa bài viết này.',
    postSaved: 'Bài viết đã được lưu.',
    postNotSaved: 'Bài viết chưa được lưu.',

    // commentCtrl
    commentNotFound: 'Bình luận không tồn tài.',
    notAllowedDeleteComment: 'Bạn không được phép xóa bình luận này.',

    // others
    somethingWrong: 'Có lỗi xảy ra.',
  },

  copyLinkSuccess: 'Đã sao chép.',
  comingSoon: 'Đang cập nhật.',
};

export default toast;
