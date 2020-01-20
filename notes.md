# Additional Possibilities

## Frontend

- Error handling for failed upload
- Cap batch size
  - Upload cicle turns red instead of blue, cloud doesn't animate
  - Files area `overflow-y: scroll`?
- Additional indicator for successful upload (like a checkmark)
  - Additional state for upload complete, waiting for server to process
- Upload button becomes cancel button during upload
- Clear becomes Clear Uploaded after upload, then back to Clear on click
- Figure out that tooltip position float issue on RangeSlider
  - Recalculate tooltip position on window/parent resize

## Backend

- Reject if not right MIME type
- Use SVG so watermark can be consistently sized
- Make copy instead of overwriting
- Doesn't center logo if original image is small