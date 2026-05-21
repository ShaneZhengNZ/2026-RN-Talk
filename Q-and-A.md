# Q & A

## Q1: React Native 既然这么好，为什么还有公司选择用 Android / iOS 原生分两套 code base？利弊比较？

写两套原生，单平台的**体验上限更高**，也更贴近系统底层能力——动画、相机、AR、新系统 API 第一天就能用。大厂或对体验极致追求的产品（Instagram 相机、抖音视频处理）走原生很合理。

但 RN 的优势也很实在：

- **一套代码两端跑**，中小团队也能维护双平台 App
- **还能直接做 Web** — React Native for Web 让同一份代码顺带覆盖浏览器；走原生的话，Web 得再写一套
- 前端技术栈复用，会 React 的人零成本上手
- OTA 更新可以绕过商店审核

Airbnb 2018 年那篇 [Sunsetting React Native](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a) 很有名，但那时还没有 Fabric / Hermes / Expo Router / Reanimated 3。如果今天重新评估，结论很可能不一样。

**我的判断**：对中小型团队、业务驱动的产品来说，2026 年是入坑 RN 最好的时机。

---

## Q2: 建议用 Expo 做 Web 吗？一套代码三端跑，还是 Web 单独做更 flexible？

**默认建议用 Expo 三端一套**。没必要再叠一个 Next.js，徒增工程复杂度和心智负担。对于移动优先、Web 只是顺带的产品（比如这场 demo 的 trending app），React Native for Web 完全够用。

但有几种场景，Web 单独做更合适：

- **SEO 重要**：营销站、内容站、电商详情页——RNW 是 client-rendered，SEO 体验比 SSR 差很多
- **Web 是主战场**：Web 流量 >> 移动端，Web 体验不该被 RN 的抽象层约束
- **需要复杂 Web-only 能力**：File API、复杂键鼠交互、桌面级布局——RNW 的组件模型在这些场景会别扭

这种情况下代码复用率会下降，但 Web 是主战场的团队体量通常也更大，多维护一套 Web 实现问题不大。

---

## Q3: 如果同时做 Web (Next.js) 和 Mobile (RN)，会用 NativeWind / Tamagui 这类方案共享 UI 代码吗？

**看需求，但建议分层考虑**：

**数据层一定共享**——Zod schemas、API fetchers、TanStack Query hooks、业务逻辑，这些和平台无关的代码三端共享几乎零成本，也是 ROI 最高的部分。

**UI 层就要看你的优先级了**：

- **重 Native 体验**：在 iOS / Android 差异化明显的组件上，自己包 Expo UI 的 native 组件，写两到三遍。换来的是每个平台都符合用户的系统直觉。
- **重多端一致性**：Tamagui、NativeWind、Tailwind variants 等方案都可以。代价是 UI 风格会更"自定义化"，偏离原生设计语言。

没有银弹。我的偏好是：**数据层共享到极致，UI 层按场景分别实现**——UI 层共享省下的时间，常常会在调样式 bug 时全部还回去。

---

## Q4: iOS vs Android 的样式怎么处理？推荐用 UI 框架（Tamagui 等）还是全用 Expo native 组件？想自定义风格的话，直接在 Expo 上改吗？

**默认走 Expo UI + react-native-unistyles**。需要自定义样式时，直接 wrap Expo UI 的组件，用 Unistyles 提供的 `StyleSheet` 来改——基本上你能想到的样式都能改。

什么时候该考虑 Tamagui / NativeWind 这类框架？**只有当跨端视觉一致性是硬需求时**——比如品牌设计系统约束很强，要求三端长得一模一样。否则默认用 Expo UI，能享受原生组件的体验。

**改样式的原则：尊重用户的肌肉记忆。**

- ✅ 可以随便改：颜色、间距、字体、圆角、阴影
- ❌ 不要去动：iOS Switch 的滑动手势、Android Material 的 ripple 反馈、系统级的交互动效

把 iOS 原生组件改得面目全非，你就失去了用原生组件的意义。原生组件值钱的地方是它符合平台用户的直觉——视觉可以微调，交互不要瞎改。



