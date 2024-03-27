package globals

import (
	"gowarriors/integrations/nba"
)

// Context is the context shared by all handlers
type Context struct {
	NBA *nba.NBA
}
