const University = require('../models/uniModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUniversities = catchAsync(async (req, res, next) => {
  const universities = await University.find({});

  res.status(200).json({
    status: 'success',
    result: universities.length,
    data: {
      data: universities
    }
  });
});

exports.getUniversity = catchAsync(async (req, res, next) => {
  const university = await University.findById(req.params.id);

  if (!University) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    university
  });
});

exports.createUniversity = catchAsync(async (req, res, next) => {
  const newUniversity = await University.create(req.body);

  res.status(201).json({
    status: 'success',
    newUniversity
  });
});

exports.deleteUniversity = catchAsync(async (req, res, next) => {
  const university = await University.findByIdAndDelete(req.params.id);

  if (!university) {
    next(new AppError('No university found with that IP', 404));
  }

  res.status(204).json({
    status: 'success',
    university: null
  });
});

exports.updateUniversity = catchAsync(async (req, res, next) => {
  const university = await University.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!university) {
    next(new AppError('No university found with that IP', 404));
  }
  res.status(200).json({
    status: 'success',
    university: {
      university
    }
  });
});
