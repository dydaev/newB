<?php
namespace RomaChe\AuthBundle\Services;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Doctrine\ORM\EntityManagerInterface;

class RequestService
{
  protected $tokenStorage;
  protected $requestStack;
  protected $em;

  private $user;
  private $request;
  private $requestContent;
  private $section;

  public function __construct(RequestStack $requestStack, EntityManagerInterface $em, TokenStorage $tokenStorage)
  {
    $this->em = $em;
    $this->requestStack = $requestStack;
    $this->$tokenStorage = $tokenStorage;

    $this->user = $tokenStorage->getToken()->getUser();

    $this->request = $this->requestStack->getCurrentRequest();

    $this->requestContent = json_decode($this->request->getContent());

    $this->section = $this->em->getRepository('NewsBundle:Section')
      ->findBy(array('name' => $name));
  }
  public function getSection()
  {
    return $this->section;
  }
  public function getSectionNameFromRequest()
  {
    return $name;
  }
  public function getRequest()
  {
    return $this->request;
  }
}
