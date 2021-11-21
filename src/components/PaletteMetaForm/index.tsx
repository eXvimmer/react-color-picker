import { Component, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { IPalette } from "../../utils/seedColors";

interface PaletteMetaFormProps {
  palettes: IPalette[];
  onSubmitPalette: (newPaletteName: string) => void;
}

interface PaletteMetaFormState {
  open: boolean;
  newPaletteName: string;
}

class PaletteMetaForm extends Component<
  PaletteMetaFormProps,
  PaletteMetaFormState
> {
  constructor(props: PaletteMetaFormProps) {
    super(props);

    this.state = {
      open: false,
      newPaletteName: "",
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTextValidatorChange = this.onTextValidatorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  onTextValidatorChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "newPaletteName":
        this.setState({
          newPaletteName: e.target.value,
        });
        break;
      default:
        return;
    }
  }

  handleSubmit() {
    this.props.onSubmitPalette(this.state.newPaletteName);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { open, newPaletteName } = this.state;
    return (
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            {/* TODO: Fix TextValidator's styles */}
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                name="newPaletteName"
                label="Palette Name"
                value={newPaletteName}
                onChange={this.onTextValidatorChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter a palette name", "Name already used"]}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PaletteMetaForm;
