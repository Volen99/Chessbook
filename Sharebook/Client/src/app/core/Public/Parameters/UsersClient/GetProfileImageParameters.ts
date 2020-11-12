import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ImageSize} from '../../Models/Enum/ImageSize';
import {IUser} from "../../Models/Interfaces/IUser";
import {IUserDTO} from "../../Models/Interfaces/DTO/IUserDTO";
import Type from "typescript-dotnet-commonjs/System/Types";

// Parameters to download an profile image from Twitter.
export interface IGetProfileImageParameters extends ICustomRequestParameters {
  // Url of the profile image
  imageUrl: string;

  // Size of the image
  imageSize: ImageSize;
}

export class GetProfileImageParameters extends CustomRequestParameters implements IGetProfileImageParameters {
  constructor(imageUrlOrUserOrUserOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters) {
    if (GetProfileImageParameters.isIGetProfileImageParameters(imageUrlOrUserOrUserOrParameters)) {
           super(imageUrlOrUserOrUserOrParameters);

           this.imageSize = ImageSize.Normal;
           this.imageSize = imageUrlOrUserOrUserOrParameters.imageSize;
           this.imageUrl = imageUrlOrUserOrUserOrParameters.imageUrl;
    } else {
      super();

      if (Type.isString(imageUrlOrUserOrUserOrParameters)) {
        this.imageUrl = imageUrlOrUserOrUserOrParameters;
      } else if (GetProfileImageParameters.isIUser(imageUrlOrUserOrUserOrParameters)) {
        this.imageUrl = imageUrlOrUserOrUserOrParameters.profileImageUrl;
      } else if (GetProfileImageParameters.isIUserDTO(imageUrlOrUserOrUserOrParameters)) {
        this.imageUrl = imageUrlOrUserOrUserOrParameters.profileImageUrl;
      }
    }
  }

  public imageUrl: string;
  public imageSize: ImageSize;

  private static isIGetProfileImageParameters(imageUrlOrUserOrUserOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters):
    imageUrlOrUserOrUserOrParameters is IGetProfileImageParameters {
    return (imageUrlOrUserOrUserOrParameters as IGetProfileImageParameters).imageSize !== undefined;
  }

  private static isIUser(imageUrlOrUserOrUserOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters):
    imageUrlOrUserOrUserOrParameters is IUser {
    return (imageUrlOrUserOrUserOrParameters as IUser).id !== undefined;
  }

  private static isIUserDTO(imageUrlOrUserOrUserOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters):
    imageUrlOrUserOrUserOrParameters is IUserDTO {
    return (imageUrlOrUserOrUserOrParameters as IUserDTO).id !== undefined;
  }
}

// public GetProfileImageParameters(string imageUrl)
// {
//   ImageUrl = imageUrl;
// }
//
// public GetProfileImageParameters(IUserDTO user)
// {
//   ImageUrl = user.ProfileImageUrl;
// }
//
// public GetProfileImageParameters(IUser user)
// {
//   ImageUrl = user.ProfileImageUrl;
// }
//
// public GetProfileImageParameters(IGetProfileImageParameters parameters) : base(parameters)
// {
//   ImageSize = ImageSize.Normal;
//
//   if (parameters == null) return;
//
//   ImageSize = parameters.ImageSize;
//   ImageUrl = parameters.ImageUrl;
// }
