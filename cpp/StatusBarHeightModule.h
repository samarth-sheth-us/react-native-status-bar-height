#pragma once

#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>

namespace facebook {
namespace react {

class JSI_EXPORT NativeStatusBarHeightModuleSpecJSI : public TurboModule {
public:
  NativeStatusBarHeightModuleSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

  virtual jsi::Value getHeight(jsi::Runtime &rt) = 0;
};

} // namespace react
} // namespace facebook 