/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createNote } from "../graphql/mutations";
const client = generateClient();
export default function NoteCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    mobileNumber: "",
    purposeOfVisit: "",
    image: "",
    vehicleNumber: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [mobileNumber, setMobileNumber] = React.useState(
    initialValues.mobileNumber
  );
  const [purposeOfVisit, setPurposeOfVisit] = React.useState(
    initialValues.purposeOfVisit
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [vehicleNumber, setVehicleNumber] = React.useState(
    initialValues.vehicleNumber
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setMobileNumber(initialValues.mobileNumber);
    setPurposeOfVisit(initialValues.purposeOfVisit);
    setImage(initialValues.image);
    setVehicleNumber(initialValues.vehicleNumber);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    mobileNumber: [],
    purposeOfVisit: [],
    image: [],
    vehicleNumber: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          mobileNumber,
          purposeOfVisit,
          image,
          vehicleNumber,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createNote.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              mobileNumber,
              purposeOfVisit,
              image,
              vehicleNumber,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Mobile number"
        isRequired={false}
        isReadOnly={false}
        value={mobileNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              mobileNumber: value,
              purposeOfVisit,
              image,
              vehicleNumber,
            };
            const result = onChange(modelFields);
            value = result?.mobileNumber ?? value;
          }
          if (errors.mobileNumber?.hasError) {
            runValidationTasks("mobileNumber", value);
          }
          setMobileNumber(value);
        }}
        onBlur={() => runValidationTasks("mobileNumber", mobileNumber)}
        errorMessage={errors.mobileNumber?.errorMessage}
        hasError={errors.mobileNumber?.hasError}
        {...getOverrideProps(overrides, "mobileNumber")}
      ></TextField>
      <TextField
        label="Purpose of visit"
        isRequired={false}
        isReadOnly={false}
        value={purposeOfVisit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              mobileNumber,
              purposeOfVisit: value,
              image,
              vehicleNumber,
            };
            const result = onChange(modelFields);
            value = result?.purposeOfVisit ?? value;
          }
          if (errors.purposeOfVisit?.hasError) {
            runValidationTasks("purposeOfVisit", value);
          }
          setPurposeOfVisit(value);
        }}
        onBlur={() => runValidationTasks("purposeOfVisit", purposeOfVisit)}
        errorMessage={errors.purposeOfVisit?.errorMessage}
        hasError={errors.purposeOfVisit?.hasError}
        {...getOverrideProps(overrides, "purposeOfVisit")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              mobileNumber,
              purposeOfVisit,
              image: value,
              vehicleNumber,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Vehicle number"
        isRequired={false}
        isReadOnly={false}
        value={vehicleNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              mobileNumber,
              purposeOfVisit,
              image,
              vehicleNumber: value,
            };
            const result = onChange(modelFields);
            value = result?.vehicleNumber ?? value;
          }
          if (errors.vehicleNumber?.hasError) {
            runValidationTasks("vehicleNumber", value);
          }
          setVehicleNumber(value);
        }}
        onBlur={() => runValidationTasks("vehicleNumber", vehicleNumber)}
        errorMessage={errors.vehicleNumber?.errorMessage}
        hasError={errors.vehicleNumber?.hasError}
        {...getOverrideProps(overrides, "vehicleNumber")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
