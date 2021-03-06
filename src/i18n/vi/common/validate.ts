const validate = {
  // user
  email: {
    email: 'Email không hợp lệ',
    required: 'Vui lòng nhập email',
  },
  password: {
    required: 'Vui lòng nhập mật khẩu',
    min: (n: number) => `Mật khẩu tối thiểu ${n} ký tự`,
    max: (n: number) => `Mật khẩu tối đa ${n} ký tự`,
  },
  name: {
    required: 'Vui lòng nhập họ tên',
    max: (n: number) => `Họ tên tối đa ${n} ký tự`,
  },
  username: {
    required: 'Vui lòng nhập username',
    min: (n: number) => `Username tối thiểu ${n} ký tự`,
    max: (n: number) => `Username tối đa ${n} ký tự`,
    valid: 'Chỉ chấp nhận A-Z, a-z, 0-9, -, .',
  },
  bio: {
    max: (n: number) => `Mô tả tối đa ${n} ký tự`,
  },
  currentPassword: {
    required: 'Vui lòng nhập mật khẩu hiện tại',
  },
  newPassword: {
    required: 'Vui lòng nhập mật khẩu mới',
  },
  confirmPassword: {
    required: 'Vui lòng nhập lại mật khẩu mới',
    match: 'Mật khẩu nhập lại không khớp',
  },

  // post
  title: {
    required: 'Vui lòng nhập tiêu đề',
    max: (n: number) => `Tiêu đề tối đa ${n} ký tự`,
  },
  content: {
    required: 'Vui lòng nhập nội dung',
    // min: (n: number) => `Nội dung tối thiểu ${n} ký tự`,
  },
  hashtags: {
    min: (n: number) => `Hashtag tối thiểu ${n} ký tự`,
    max: (n: number) => `Hashtag tối đa ${n} ký tự`,
    valid: 'Hashtag chỉ chấp nhận A-Z, a-z, 0-9, -',
  },
};

export default validate;
