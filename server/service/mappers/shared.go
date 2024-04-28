package mappers

import (
	"strconv"
	"time"
)

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

const washingtonWizardsLogo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Washington_Wizards_logo.svg/1200px-Washington_Wizards_logo.svg.png"

func fixTeamLogo(id int, logo string) string {
	if int(id) == 41 {
		return washingtonWizardsLogo
	}

	return logo
}
