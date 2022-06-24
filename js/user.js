// //用户登录和注册 通用的代码
// function $(selector) {
//   return document.querySelector(selector);
// }
// function $$(selector) {
//   return document.querySelectorAll(selector);
// }
// function $$$(tagname) {
//   return document.createElement(tagname);
// }

// //验证某一个输入框（构造函数）
// class FieldValidator {
//   /**
//    *构造器
//    * @param {string} txtId,文本框的ID，用来获取DOM元素
//    * @param {function} validatorFunc ,验证规则函数，在需要对文本框验证时，调用该函数，没错不返回，有错返回错误消息
//    */
//   constructor(txtId, validatorFunc) {
//     this.input = document.getElementById(txtId);
//     this.p = this.input.nextElementSibling;
//     this.validatorFunc = validatorFunc;
//     this.input.addEventListener("blur", () => this.validate());
//   }

//   //验证，正确放回true
//   async validate() {
//     const err = await this.validatorFunc(this.input.value);
//     if (err) {
//       this.p.innerText = err;
//       return false;
//     } else {
//       this.p.innerText = "";
//       return true;
//     }
//   }

//   // 对所有文本框验证，所有都通过才返回true
//   static async validate(...validators) {
//     const proms = validators.map((item) => item.validate());
//     const res = await Promise.all(proms);
//     return res.every((item) => item);
//   }
// }

// 用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidator {
  /**
   * 构造器
   * @param {String} txtId 文本框的Id
   * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }

  /**
   * 验证，成功返回true，失败返回false
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  /**
   * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
   * @param {FieldValidator[]} validators
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const results = await Promise.all(proms);
    return results.every((r) => r);
  }
}
