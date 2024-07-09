declare namespace User {

  namespace GetLoginCallback {
    interface Req {
      code: string
    }

    interface Res {
      jwt: string
    }
  }

  namespace GetUserProfile {

    interface Res {
      name: string
      address: string
    }
  }

  namespace SendUserOperation {
    interface Req {
      nonce: string
      initCode: string
      callData: string
      callGasLimit: string
      verificationGasLimit: string
      preVerificationGas: string
      maxFeePerGas: string
      maxPriorityFeePerGas: string
      paymasterAndData: string
      signature: string
    }

    interface Res {
      msg: string
    }
  }

  namespace GetWalletCheck {
    interface Res {
      deployed: boolean
    }
  }

  namespace DeployWalletContract {
    interface Res {
      deployed: boolean
    }
  }
}
