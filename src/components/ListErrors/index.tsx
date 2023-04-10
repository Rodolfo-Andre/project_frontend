import { IErrorMessages } from "@/interfaces";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface IListErrorsProps {
  errorMessages: IErrorMessages;
}

const ListErrors = ({ errorMessages }: IListErrorsProps) => {
  return (
    <List>
      {Object.keys(errorMessages).map((key) => (
        <ListItem
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
          key={key}
        >
          <Typography>{key}</Typography>
          {errorMessages[key].map((message) => (
            <ListItemText key={message} secondary={"- " + message} />
          ))}
        </ListItem>
      ))}
    </List>
  );
};

export default ListErrors;
