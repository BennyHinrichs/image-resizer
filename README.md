# Hello

Thank you for visiting my repo. Below are notes on possible future developments.

## Frontend
- Filter by MIME type
- Error handling for failed upload
- Cap batch size
  - Upload cicle turns red instead of blue, cloud doesn't animate
  - Files area `overflow-y: scroll`?
- Additional indicator for successful upload (like a checkmark)
  - Additional state for upload complete, waiting for server to process
- Upload button becomes cancel button during upload
- Clear becomes Clear Uploaded after upload, then back to Clear on click
- Figure out that tooltip position drift issue on RangeSlider
  - Recalculate tooltip position on window/parent resize
- Present/persist the return results better
- Vertical for small screens

## Backend
- Reject if not right MIME type
- Use SVG so watermark can be consistently sized
- Make copy instead of overwriting
- Doesn't center logo if original image is small
- Size limits
- File expiration
- Check if file already exists