import {createMuiTheme} from '@material-ui/core/styles'
import {blue} from '@material-ui/core/colors/'
import {lime} from '@material-ui/core/colors/'
import {red} from '@material-ui/core/colors/'


const theme = createMuiTheme({
    palette: {
        custom: {
            primary: red[400]
        }
    }
})

export default theme;

