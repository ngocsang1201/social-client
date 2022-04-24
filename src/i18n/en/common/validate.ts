const validate = {
  // user
  email: {
    email: 'Invalid email address',
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    min: (n: number) => `Password must be at least ${n} characters`,
    max: (n: number) => `Password must be at most ${n} characters`,
  },
  name: {
    required: 'Full name is required',
    max: (n: number) => `Full name must be at most ${n} characters`,
  },
  username: {
    required: 'Username is required',
    min: (n: number) => `Username must be at least ${n} characters`,
    max: (n: number) => `Username must be at most ${n} characters`,
    valid: 'Only A-Z, a-z, 0-9, -, . are allowed',
  },
  phone: {
    valid: 'Phone number is invalid',
  },
  currentPassword: {
    required: 'Current password is required',
  },
  newPassword: {
    required: 'New password is required',
  },
  confirmPassword: {
    required: 'Confirm password is required',
    match: 'Confirm password does not match',
  },

  // post
  title: {
    required: 'Please enter a title',
  },
  content: {
    required: 'Please enter content',
    min: (n: number) => `Content must be at least ${n} characters`,
  },
  keywords: {
    min: (n: number) => `Keywords must be at least ${n} characters`,
    max: (n: number) => `Keywords must be at most ${n} characters`,
    valid: 'Keywords: Only A-Z, a-z, 0-9, - are allowed',
  },
};

export default validate;
