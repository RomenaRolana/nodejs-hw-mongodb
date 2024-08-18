export const notFoundHandler = (req, res) => {
  // Directly setting the status and JSON response to handle 404 not found
  res.status(404).json({
    status: 404,
    message: 'Contact not found',
    data: {} // Optionally include additional data or leave empty
  });
};

