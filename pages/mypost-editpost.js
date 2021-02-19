import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";

// redux
import { connect } from "react-redux";
import {
  editPost,
  deletePost,
  clearErrors,
} from "../redux/actions/dataActions";

// util/components
import { ScreenContainer } from "../util/containers";
import {
  MyTextInput,
  MyTextArea,
  MyButton2,
  MyButton3,
} from "../util/my-form-elements";
import {
  EditPostTitle,
  ItemImage,
  CategoriesSection,
} from "../components/mypost-components";
import { BackIcon, SaveIcon, TrashIcon } from "../util/icons";
import { pickImage, getFormData } from "../util/functions";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

const editpost = (props) => {
  const { post } = props.route.params;

  const [name, setName] = useState(post.item.name);
  const [imageUri, setImageUri] = useState(post.item.image);
  const [price, setPrice] = useState(post.item.price.toString());
  const [description, setDescription] = useState(post.item.description);
  const [categories, setCategories] = useState(
    post.item.categories ? [...post.item.categories] : []
  );

  const submit = () => {
    const editedPost = {
      name,
      image: imageUri,
      price,
      description,
      categories,
    };

    let formData = null;
    if (
      !imageUri.startsWith(
        "https://firebasestorage.googleapis.com/v0/b/apu-fyp-3cfd9.appspot.com/o/"
      )
    ) {
      formData = getFormData(imageUri);
    }

    props.editPost(post.postId, editedPost, formData, props.navigation);
  };

  const deletePostOnPress = () => {
    Alert.alert("Delete post", "Proceed to delete the post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => props.deletePost(post.postId, props.navigation),
      },
    ]);
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
      console.log("receive errors:" + JSON.stringify(props.UI.errors));
    }
  }, [props.UI.errors]);

  // createdAt, isAvailable, item (categories, desc, img, name, price), postId

  return (
    <ScreenContainer>
      <EditPostTitle />
      <View style={{ alignItems: "center" }}>
        <MyTextInput
          placeholder="Item Name/Post Title"
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
          style={{ width: "20%" }}
        >
          <BackIcon style={{ color: "#f45c57" }} />
        </MyButton2>
        <MyButton3 onPress={deletePostOnPress} style={{ width: "20%" }}>
          <TrashIcon style={{ color: "#fff" }} />
        </MyButton3>
        <MyButton2 onPress={submit} style={{ width: "20%" }}>
          <SaveIcon style={{ color: "#fbb124" }} />
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
  editPost,
  deletePost,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(editpost);
