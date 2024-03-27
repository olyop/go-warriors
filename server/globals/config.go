package globals

import "fmt"

// Hostname is the hostname for the server
const Hostname = "0.0.0.0"

// Port is the port for the server
const Port = 8080

// Address is the address for the server
var Address = fmt.Sprintf("%s:%d", Hostname, Port)
