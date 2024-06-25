declare namespace User {

  namespace GetLoginCallback {
    interface Req {
      code: string
    }

    interface Res {
      jwt: string
    }
  }
}
