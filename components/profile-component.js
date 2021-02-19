import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

// utils/components
import { ProfileSection } from "../util/containers";
import {
  ExpandableText,
  ContactButton,
  ChatButton,
} from "../util/my-form-elements";
import { UserIcon, EmailIcon, DateIcon, MessageIcon } from "../util/icons";

import dayjs from "dayjs";

export const TopSection = (props) => (
  <View style={{ marginBottom: 20 }}>
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      <View
        style={{
          width: "45%",
        }}
      >
        <View
          style={{
            width: "80%",
            aspectRatio: 1,
            borderRadius: 100,
            overflow: "hidden",
            //elevation: 15,
          }}
        >
          <Image
            style={{
              flex: 1,
            }}
            source={{
              uri: props.imageUri,
            }}
          />
        </View>
      </View>
      <View style={{ justifyContent: "space-around", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <UserIcon size={18} style={{ color: "#555", marginRight: 5 }} />
          <Text style={{ fontWeight: "bold" }}>{`@${props.handle}`}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <EmailIcon size={18} style={{ color: "#555", marginRight: 5 }} />
          <Text>{props.email}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DateIcon size={18} style={{ color: "#555", marginRight: 5 }} />
          <Text>{`since ${dayjs(props.createdAt).format("MMM YYYY")}`}</Text>
        </View>
        <TouchableOpacity onPress={props.editProfileOnPress}>
          <View
            style={{
              width: "100%",
              height: 25,
              marginVertical: 5,
              borderWidth: 1,
              borderRadius: 6,
              borderColor: "#AAA",
              justifyContent: "center",
              alignItems: "center",
              // flexDirection: "row",
            }}
          >
            {/* <EditIcon size={16} style={{ marginRight: 5 }} /> */}
            <Text style={{ fontWeight: "bold" }}>Edit profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    <View style={{}}>
      <Text style={{ fontWeight: "bold" }}>{props.fullName}</Text>
      <ExpandableText>{props.bio}</ExpandableText>
    </View>
  </View>
);

// icons
import {
  ContactsIcon,
  LocationIcon,
  FbIcon,
  IgIcon,
  PhoneIcon,
  WhatsappIcon,
} from "../util/icons";

export const LocationSection = (props) => {
  const LocationData = (props) => (
    <View style={{ ...props.viewStyles }}>
      <Text style={{ color: "#888" }}>{props.title}</Text>
      <Text style={{ fontWeight: "bold", color: "#444" }}>{props.data}</Text>
    </View>
  );

  return (
    <ProfileSection
      title="Location"
      Icon={LocationIcon}
      backgroundColor={props.backgroundColor}
    >
      <LocationData
        viewStyles={{ marginBottom: 8 }}
        title="Address"
        data={props.address}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <LocationData
          viewStyles={{ width: "30%" }}
          title="Postcode"
          data={props.postcode}
        />
        <LocationData
          viewStyles={{ width: "30%" }}
          title="City"
          data={props.city}
        />
        <LocationData
          viewStyles={{ width: "30%" }}
          title="State"
          data={props.state}
        />
      </View>
    </ProfileSection>
  );
};

const ContactData = (props) => {
  const { Icon, linkUrl, handle, color, title } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ color: "#888" }}>{props.title}</Text>
        <Text style={{ color: "#444" }}>{props.data}</Text>
      </View>
      <View>
        {linkUrl ? (
          <ContactButton
            Icon={Icon}
            linkUrl={linkUrl}
            color={color}
            iconSize={28}
            appName={title}
          />
        ) : (
          <ChatButton
            Icon={Icon}
            handle={handle}
            color="#fbb124"
            iconSize={28}
          />
        )}
      </View>
    </View>
  );
};

export const ContactsSection = (props) => {
  const { fb, ig, waEnabled, phoneNo, handle } = props;

  const phoneNoUrl = `tel:${phoneNo}`;
  const waUrl = `whatsapp://send?phone=${phoneNo}`;
  const fbUrl = `fb://facewebmodal/f?href=https://www.facebook.com/${fb}`;
  const igUrl = `instagram://user?username=${ig}`;

  const ChatComponent = (
    <>
      <Text>orent-chat/</Text>
      <Text style={{ fontWeight: "bold" }}>{`@${handle}`}</Text>
    </>
  );

  const PhoneComponent = (
    <Text style={{ fontWeight: "bold" }}>{`+${phoneNo}`}</Text>
  );

  const WaComponent = (
    <>
      <Text>wa.me/+</Text>
      <Text style={{ fontWeight: "bold" }}>{phoneNo}</Text>
    </>
  );

  const FbComponent = (
    <>
      <Text>fb.com/</Text>
      <Text style={{ fontWeight: "bold" }}>{fb}</Text>
    </>
  );

  const IgComponent = <Text style={{ fontWeight: "bold" }}>{`@${ig}`}</Text>;

  return (
    <ProfileSection
      title="Contacts"
      Icon={ContactsIcon}
      backgroundColor={props.backgroundColor}
    >
      {!handle && !phoneNo && !waEnabled && !fb && !ig && (
        <Text style={{ alignSelf: "center", color: "#888" }}>
          No contact info given...
        </Text>
      )}
      {handle && (
        <ContactData
          title="Chat"
          Icon={MessageIcon}
          data={ChatComponent}
          handle={handle}
          color="#fbb124"
        />
      )}
      {phoneNo && (
        <ContactData
          title="Phone"
          Icon={PhoneIcon}
          data={PhoneComponent}
          linkUrl={phoneNoUrl}
          color="#fbb124"
        />
      )}
      {waEnabled && (
        <ContactData
          title="WhatsApp"
          Icon={WhatsappIcon}
          data={WaComponent}
          linkUrl={waUrl}
          color="#128c7e"
        />
      )}
      {fb && (
        <ContactData
          title="Facebook"
          Icon={FbIcon}
          data={FbComponent}
          linkUrl={fbUrl}
          color="#3b5998"
        />
      )}
      {ig && (
        <ContactData
          title="Instagram"
          Icon={IgIcon}
          data={IgComponent}
          linkUrl={igUrl}
          color="#c32aa3"
        />
      )}
    </ProfileSection>
  );
};
