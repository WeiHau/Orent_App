import React from "react";

// icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const UserIcon = (props) => (
  <AntDesign name="user" size={24} {...props} />
);

export const EmailIcon = (props) => (
  <Fontisto name="email" size={24} {...props} />
);

export const LockIcon = (props) => (
  <AntDesign name="lock1" size={24} {...props} />
);

export const PhoneIcon = (props) => (
  <Feather name="phone" size={24} {...props} />
);

export const ContactsIcon = (props) => (
  <AntDesign name="contacts" size={24} {...props} />
);

// export const LocationIcon = (props) => (
//   <AntDesign name="enviromento" size={24} {...props} />
// );

export const LocationIcon = (props) => (
  <Entypo name="location" size={24} {...props} />
);

export const LocationIcon2 = (props) => (
  <Entypo name="location-pin" size={24} {...props} />
);

export const FbIcon = (props) => (
  <AntDesign name="facebook-square" size={24} {...props} />
);

export const FbIcon2 = (props) => (
  <FontAwesome5 name="facebook-f" size={24} {...props} />
);

export const IgIcon = (props) => (
  <AntDesign name="instagram" size={24} {...props} />
);

export const WhatsappIcon = (props) => (
  <MaterialCommunityIcons name="whatsapp" size={24} {...props} />
);

export const PlusIcon = (props) => (
  <AntDesign name="plus" size={24} {...props} />
);

export const TagsIcon = (props) => (
  <AntDesign name="tags" size={24} {...props} />
);

export const TrashIcon = (props) => (
  <AntDesign name="delete" size={24} {...props} />
);

export const LogoutIcon = (props) => (
  <AntDesign name="logout" size={24} {...props} />
);

export const BackIcon = (props) => (
  <AntDesign name="back" size={24} {...props} />
);

export const FrownIcon = (props) => (
  <AntDesign name="frowno" size={24} {...props} />
);

// export const BackIcon2 = (props) => (
//   <AntDesign name="arrowleft" size={24} {...props} />
// );

export class BackIcon2 extends React.Component {
  render() {
    return <AntDesign name="arrowleft" size={24} {...this.props} />;
  }
}

export const SaveIcon = (props) => (
  <AntDesign name="save" size={24} {...props} />
);

export const ItemIcon = (props) => (
  <AntDesign name="dribbble" size={24} {...props} />
);

export const SearchIcon = (props) => (
  <AntDesign name="search1" size={24} {...props} />
);

export class ChevronDownIcon extends React.Component {
  render() {
    return <Entypo name="chevron-down" size={24} {...this.props} />;
  }
}

export const ChevronUpIcon = (props) => (
  <Entypo name="chevron-up" size={24} {...props} />
);

export const XIcon = (props) => (
  <MaterialIcons name="clear" size={24} {...props} />
);

export const DateIcon = (props) => (
  <Fontisto name="date" size={24} {...props} />
);

export const EditIcon = (props) => (
  <MaterialIcons name="edit" size={24} {...props} />
);

export const SendIcon = (props) => (
  <FontAwesome name="send" size={24} {...props} />
);

export const MessageIcon = (props) => (
  <AntDesign name="message1" size={24} {...props} />
);
