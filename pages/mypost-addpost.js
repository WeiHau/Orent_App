import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

// redux
import { connect } from "react-redux";
import { postPost, clearErrors } from "../redux/actions/dataActions";

// util/components
import { ScreenContainer } from "../util/containers";
import {
  MyTextInput,
  MyTextArea,
  MyButton,
  MyButton2,
} from "../util/my-form-elements";
import {
  AddPostTitle,
  ItemImage,
  CategoriesSection,
} from "../components/mypost-components";
import { pickImage, getFormData } from "../util/functions";
import ScreenLoadingModal from "../util/ScreenLoadingModal";
import { BackIcon } from "../util/icons";

const addpost = (props) => {
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const submit = () => {
    const item = { name, price, description, categories };

    let formData = null;
    if (imageUri) {
      formData = getFormData(imageUri, "test-image.jpg");
    }

    props.postPost(item, formData, props.navigation);
  };

  // error handling
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setErrors({});
    });
    return unsubscribe;
  }, [props.navigation]);
  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
      //console.log("receive errors:" + JSON.stringify(props.UI.errors));
    }
  }, [props.UI.errors]);

  // createdAt, isAvailable, item (categories, desc, img, name, price), postId

  return (
    <ScreenContainer>
      <AddPostTitle />
      <View style={{ alignItems: "center" }}>
        <MyTextInput
          placeholder="Item Name / Post Title"
          value={name}
          onChangeText={(e) => {
            setName(e);
          }}
          style={{ width: "100%", fontWeight: "bold", textAlign: "center" }}
          error={errors.name}
          clearError={() => {
            setErrors({ ...errors, name: null });
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <ItemImage
          imageUri={imageUri}
          pickImage={() => {
            pickImage(setImageUri);
            setErrors({ ...errors, image: null });
          }}
          error={errors.image}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingTop: "15%",
          }}
        >
          <MyTextInput
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={(e) => {
              setPrice(e);
            }}
            viewStyle={{ width: "50%" }}
            style={{ width: "100%", fontWeight: "bold", textAlign: "center" }}
            error={errors.price}
            clearError={() => {
              setErrors({ ...errors, price: null });
            }}
          />
          <Text style={{ color: "#888", fontSize: 12 }}>RM/day</Text>
        </View>
      </View>
      <MyTextArea
        placeholder="Item description"
        value={description}
        onChangeText={(e) => {
          setDescription(e);
        }}
        error={errors.description}
        clearError={() => {
          setErrors({ ...errors, description: null });
        }}
        viewStyle={{ marginBottom: 20 }}
      />
      <CategoriesSection
        categories={categories}
        setCategories={setCategories}
      />
      <View
        style={{
          marginTop: 80,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <MyButton2
          onPress={() => {
            props.clearErrors();
            props.navigation.navigate("Home");
          }}
          style={{ width: "30%" }}
        >
          <BackIcon style={{ color: "#f45c57" }} />
        </MyButton2>
        <MyButton2 onPress={submit} style={{ width: "30%" }}>
          <Text style={{ color: "#fbb124" }}>POST!</Text>
        </MyButton2>
      </View>
      {props.UI.loading && <ScreenLoadingModal />}
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  postPost,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(addpost);
