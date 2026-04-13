# Feature Data Entities

## History Record
The endpoint `GET /blocks/camera/{ID}/date-range/summary` returns data required to plot the history. 
Expected structure based on current `historico.html` mock implementation and standard project structures:
- `labels` (Array of Strings): Timestamps representing the X-axis points.
- `producaoBoa` (Array of Numbers): Good production counts plotted on the Y-axis.
- `producaoTotal` (Array of Numbers): Total production counts plotted on the secondary Y-axis.

## Local Session Cache
- **`tandera_token`**: JWT for authenticated API calls and seed for encryption.
- **`tandera_serverIp`**: Base URL of the API.
- **`tandera_cameras`**: Encrypted list of cameras (fallback usage if URL is empty).

## URL Parameters
- `camera`: Hexadecimal string `_id` of the camera.
- `name`: Human-readable name of the machine.
