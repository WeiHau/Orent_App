// Programmer Name     : Lim Wei Hau
// Program Name        : functions.js
// Description         : util - all often used functions
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

const states = [
  { name: "Perlis", postcodes: "01000 - 02800" },
  { name: "Kedah", postcodes: "05000 - 09810" },
  { name: "Penang", postcodes: "10000 - 14400" },
  { name: "Kelantan", postcodes: "15000 - 18500" },
  { name: "Terengganu", postcodes: "20000 - 24300" },
  { name: "Pahang", postcodes: "25000 - 28800 | 39000 - 39200 | 49000, 69000" },
  { name: "Perak", postcodes: "30000 - 36810" },
  { name: "Selangor", postcodes: "40000 - 48300 | 63000 - 68100" },
  { name: "W.P. Kuala Lumpur", postcodes: "50000 - 60000" },
  { name: "W.P. Putrajaya", postcodes: "62000 - 62988" },
  { name: "Negeri Sembilan", postcodes: "70000 - 73509" },
  { name: "Melaka", postcodes: "75000 - 78309" },
  { name: "Johor", postcodes: "79000 - 86900" },
  { name: "W.P. Labuan", postcodes: "87000 - 87033" },
  { name: "Sabah", postcodes: "88000 - 91309" },
  { name: "Sarawak", postcodes: "93000 - 98859" },
];

const isState = (postcodes, target) => {
  postcodes = postcodes.replace(/\s/g, "");

  if (postcodes.includes("-")) {
    postcodes = postcodes.split("|");
  }

  let flag = false;
  postcodes.forEach((codes) => {
    if (codes.includes("-")) {
      let [min, max] = codes.split("-");

      temp = parseInt(target);
      min = parseInt(min);
      max = parseInt(max);
      if (min < temp && temp < max) {
        flag = true;
        return;
      }
    } else if (codes.includes(",")) {
      codes = codes.split(",");
      if (codes.includes(target)) {
        flag = true;
        return;
      }
    }
  });

  return flag;
};

export const getStateFromPostcode = (postcode) => {
  let result = null;

  states.forEach((state) => {
    if (isState(state.postcodes, postcode)) {
      result = state.name;
      return;
    }
  });

  return result;
};

// IMAGE PICKER FUNCTIONS
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Alert } from "react-native";

const requestPermission = async (imagePickerType) => {
  if (Platform.OS !== "web") {
    const { status } = imagePickerType
      ? await ImagePicker.requestMediaLibraryPermissionsAsync()
      : await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return false;
    }
    return true;
  }
};

export const pickImage = (setImageUri) => {
  Alert.alert(
    "Upload an image",
    "Pick image from...",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Camera",
        onPress: () => pickImageAsync(setImageUri, 0),
      },
      {
        text: "Gallery",
        onPress: () => pickImageAsync(setImageUri, 1),
      },
    ],
    { cancelable: false }
  );
};

const pickImageAsync = async (setImageUri, imagePickerType) => {
  if (!(await requestPermission(imagePickerType))) return;

  let result = imagePickerType
    ? await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.5,
      })
    : await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });

  // image directly from cameraasync is too large
  if (!imagePickerType && !result.cancelled) {
    result = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0.5,
      format: ImageManipulator.SaveFormat.JPEG,
    });
  }

  if (!result.cancelled) {
    // // extra check: if the file type isnt image:
    // if (result.type !== "image") {
    //   alert("Please select image file only");
    //   return;
    // }

    setImageUri(result.uri);
  }
};

export const getFormData = (uri) => {
  const image = {
    uri,
    type: "image/jpeg",
    name: "test-image.jpg",
  };

  const formData = new FormData();
  formData.append("image", image, "test-image.jpg");
  return formData;
};
