import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ImageSize} from '../../Models/Enum/ImageSize';
import {IUser} from "../../Models/Interfaces/IUser";
import {IUserDTO} from "../../Models/Interfaces/DTO/IUserDTO";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// Parameters to download an profile image from Twitter.
export interface IGetProfileImageParameters extends ICustomRequestParameters {
  // Url of the profile image
  ImageUrl: string;

  // Size of the image
  ImageSize: ImageSize;
}

export class GetProfileImageParameters extends CustomRequestParameters implements IGetProfileImageParameters {
  constructor(imageUrlOrUserOrUserOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters) {
    if (GetProfileImageParameters.isIGetProfileImageParameters(imageUrlOrUserOrUserOrParameters)) {
           super(imageUrlOrUserOrUserOrParameters);

           this.ImageSize = ImageSize.Normal;
           this.ImageSize = imageUrlOrUserOrUserOrParameters.ImageSize;
           this.ImageUrl = imageUrlOrUserOrUserOrParameters.ImageUrl;
    } else {
      super();

      if (Type.isString(imageUrlOrUserOrUserOrParameters)) {
        this.ImageUrl = imageUrlOrUserOrUserOrParameters;
      } else if (GetProfileImageParameters.isIUser(imageUrlOrUserOrUserOrParameters)) {
        this.ImageUrl = imageUrlOrUserOrUserOrParameters.profileImageUrl;
      } else if (GetProfileImageParameters.isIUserDTO(imageUrlOrUserOrUserOrParameters)) {
        this.ImageUrl = imageUrlOrUserOrUserOrParameters.profileImageUrl;
      }
    }
  }

  public ImageUrl: string;
  public ImageSize: ImageSize;

  private static isIGetProfileImageParameters(imageUrlOrUserOrUserOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters):
    imageUrlOrUserOrUserOrParameters is IGetProfileImageParameters {
    return (imageUrlOrUserOrUserOrParameters as IGetProfileImageParameters).ImageSize !== undefined;
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
