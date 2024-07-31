# Server

This is the server side of our application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have go installed on your device to be a ble to run this server.
The server runs with Go, Gin and an SqlLite database

```sh
run go get to install all the required dependencies

run go run main.go to get the server started after installing the required dependencies.

GET /api/v1/tenants/:id: Retrieves a tenant by its ID. The ID should be provided as a URL parameter.