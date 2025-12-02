// Interview Components - Centralized Exports

export { QuestionCard } from './QuestionCard'
export { AnswerSection } from './AnswerSection'
export { CodeExample } from './CodeExample'
export { HintButton } from './HintButton'
export { VideoEmbed } from './VideoEmbed'
export { RelatedTopics } from './RelatedTopics'
export { SearchBar } from './SearchBar'
export { LanguageLogo, languageColors } from './LanguageLogo'
export { LanguageCard } from './LanguageCard'
export { InterviewFilters } from './InterviewFilters'
export { QuestionListItem } from './QuestionListItem'
export { FilterSheet } from './FilterSheet'
export { QuestionProgress } from './QuestionProgress'
export { MobileNavigation } from './MobileNavigation'

// New components for infinite scroll
export { TopicSection } from './TopicSection'
export { ScrollProgress } from './ScrollProgress'
export { BackToTop } from './BackToTop'
export {
  QuestionGroupSkeleton,
  LoadMoreIndicator,
  EndOfListIndicator,
  LoadError,
  ScrollSentinel,
} from './LoadingIndicators'

// Deprecated - kept for backward compatibility
/** @deprecated Use TopicSection instead */
export { TopicAccordion } from './TopicAccordion'
/** @deprecated No longer needed with infinite scroll */
export { Pagination } from './Pagination'
