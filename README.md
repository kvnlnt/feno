# Feno
A Genetically Engineered Polymorphic Design System

## Summary
In genetics, the [phenotype](https://en.wikipedia.org/wiki/Phenotype) (from Greek φαινο- 'showing', and τύπος 'type') is the set of observable characteristics or traits of an organism. The term covers the organism's morphology or physical form and structure, its developmental processes, its biochemical and physiological properties, its behavior, and the products of behavior. 

## Goals
- [x] KISS principle
- [x] Standards Compliant
- [x] Incremental Adoption
- [x] Framework Agnostic

## Concepts
### Terms
- Types = Expressions
- Tokens = Theme
- Atoms = Types x Tokens
- Elements = Atoms x Atoms
- Components = Elements x Elements

### Theory
#### Terms
- Entity = This ojbect
- Expression = With this emotion
- Environment = In this context
- Attribute = Color, Size, Position

#### Equation
P<sub>A</sub> = B(C)

A property of an entity is equal to its emotion operating as a function of its environment. This could be expressed as:
- *A* = Entity (example: `button` element)
- *B* = Expression (example: an "alert" state)
- *C* = Environment (example: in a form)
- *P* = Attribute (example: background color)

## Conventions

### Atoms
All atoms are classes and make up the core css rules. Each class has the following naming convention:

`[theme]`\_`[attribute]`\_`[expression]`

#### Example: `.dark_bg_alert`
```
  <button class="dark_bg_alert"/>
```

### Elements
The **FENO**Type designer allows you to create *Elements* which are nothing more than `Atoms` applied to markup. It follows a similar naming convention to `Atoms`.

`[theme]`\_`[environment]`\_`[expression]`\_`[element]`

A configuration that used the following `Atoms`:
- dark_bg_alert
- dark_txt_white
- dark_fs_lg

This would render the following cut/paste markup:

```
// Suggested Name: FormAlertButton
<button class="dark_bg_alert dark_txt_white dark_fs_lg"/>
```