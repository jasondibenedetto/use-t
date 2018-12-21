# [1.3.0](https://github.com/streamich/use-/compare/v1.2.0...v1.3.0) (2018-12-21)


### Bug Fixes

* 🐛 export correctly default translation function ([48266d5](https://github.com/streamich/use-/commit/48266d5))


### Features

* 🎸 export default translation function as T ([0ac3429](https://github.com/streamich/use-/commit/0ac3429))
* 🎸 implement FaCC and HOC without hooks ([7956b3d](https://github.com/streamich/use-/commit/7956b3d))

# [1.2.0](https://github.com/streamich/use-/compare/v1.1.1...v1.2.0) (2018-12-01)


### Features

* allow 0 to indicate it should not be translated ([9633ef5](https://github.com/streamich/use-/commit/9633ef5))

## [1.1.1](https://github.com/streamich/use-/compare/v1.1.0...v1.1.1) (2018-12-01)


### Bug Fixes

* 🐛 load initial language if not def and in loader ([a27b47f](https://github.com/streamich/use-/commit/a27b47f))

# [1.1.0](https://github.com/streamich/use-/compare/v1.0.0...v1.1.0) (2018-12-01)


### Features

* 🎸 precreate React primitives ([5eda1ea](https://github.com/streamich/use-/commit/5eda1ea))

# 1.0.0 (2018-11-06)


### Bug Fixes

* 🐛 load correct locale, if async locale changed meantime ([560c770](https://github.com/streamich/use-/commit/560c770))
* 🐛 make sure default locale exists in translation map ([c694f65](https://github.com/streamich/use-/commit/c694f65))


### Features

* 🎸 add namespaces ([dcf24b5](https://github.com/streamich/use-/commit/dcf24b5))
* 🎸 don't provide interpolation a translation function ([e1b9697](https://github.com/streamich/use-/commit/e1b9697))
* 🎸 fallback to default locale if no translation found ([e0c58b6](https://github.com/streamich/use-/commit/e0c58b6))
* 🎸 improve <Trans> component ([ce0460b](https://github.com/streamich/use-/commit/ce0460b))
* 🎸 improve interpolations, add tagged literals support ([9f2d6b8](https://github.com/streamich/use-/commit/9f2d6b8))
* 🎸 improve typings ([e9e0cb6](https://github.com/streamich/use-/commit/e9e0cb6))
* 🎸 improve useT, allow usage without <Provider> ([d143fce](https://github.com/streamich/use-/commit/d143fce))
* 🎸 improve withT HOC ([09acebd](https://github.com/streamich/use-/commit/09acebd))
* 🎸 initial implementation ([f9a1fa9](https://github.com/streamich/use-/commit/f9a1fa9))
* 🎸 store everything in context ([34a5ad1](https://github.com/streamich/use-/commit/34a5ad1))


### BREAKING CHANGES

* Change how interpolations work.
* interpolations don't receive translation function anymore
