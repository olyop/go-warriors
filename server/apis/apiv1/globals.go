package apiv1

import (
	"strconv"
	"time"
)

// NBALeague is the league to use for NBA API requests
const NBALeague = "standard"

// DetermineSeason determines the current NBA season
func DetermineSeason() string {
	now := time.Now()

	var year int

	// check if we are in the off-season
	// the NBA season usually starts in October
	if now.Month() < 10 {
		year = now.Year() - 1
	} else {
		year = now.Year()
	}

	return strconv.Itoa(year)
}
