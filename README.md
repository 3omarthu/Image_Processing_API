### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 8080:

#### Brief instructions
http://localhost:8080/

#### Example 
http://localhost:8080/api/images?filename=fjord&width=200&height=200
Will scale the fjord image to 200 by 200 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the
original again.


