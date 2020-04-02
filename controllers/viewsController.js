const University = require('../models/uniModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const universities = await University.find();

  res.status(200).render('overview', {
    title: 'All Univeristies',
    universities
  });
});

exports.getUniversity = catchAsync(async (req, res, next) => {
  const university = await University.findOne({ slug: req.params.slug });

  if (!university) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('university', {
    title: `${university.name}`,
    university
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
