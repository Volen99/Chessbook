export class RequestAuthUrlInternalParameters extends RequestUrlAuthUrlParameters {

  constructor(parameters: IRequestAuthUrlParameters, authRequest: IAuthenticationRequest) {
    super(parameters);
    this.AuthRequest = authRequest;
  }

  public AuthRequest: IAuthenticationRequest;
}
