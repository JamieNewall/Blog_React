import {createMuiTheme} from '@material-ui/core/styles'
import {blue} from '@material-ui/core/colors/'
import {lime} from '@material-ui/core/colors/'
import {red} from '@material-ui/core/colors/'


const theme = createMuiTheme({
    palette: {
        custom: {
            primary: red[400],
            accent: '#9E4E2B'
        },
        primary: {
            main: '#2A9D8F',
            light: '#289FB5',
            dark: '#689F38'
        }
    }
})

export default theme;

