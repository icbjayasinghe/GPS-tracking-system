const ERROR_RESPONCE = {
    unauthorized: e => {
        return {
            code: 4010,
            message: constant.RESPONCE.Unauthorized,
            success: false,
            data: e
        };
    },
    validation: e => {
        return {
            code: 4011,
            message: constant.RESPONCE.validation,
            success: false,
            data: e
        };
    },
    contentNotFound: e => {
        return {
            code: 4012,
            message: constant.RESPONCE.DbContentNotFound,
            success: false,
            data: e
      };
    },
    serverError: e => {
        return {
            code: 5000,
            message: constant.RESPONCE.InternalServeError,
            success: false,
            data: e
        };
    },
    notFound: e => {
        return {
            code: 4040,
            message: constant.RESPONCE.notFound,
            success: false,
            data: e
        };
    }
};

const SUCCESS_RESPONCE = {
    success: s => {
        return {
            code: 2001,
            message: constant.RESPONCE.Successful,
            success: true,
            data: s
        };
    },
    exist: s => {
        return {
            code: 4220,
            message: constant.RESPONCE.DataExist,
            success: false,
            data: s
        };
    }
};
  
export {
    ERROR_RESPONCE,
    SUCCESS_RESPONCE
};